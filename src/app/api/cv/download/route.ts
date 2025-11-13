import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import jsPDF from 'jspdf';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all data from database
    const [hero, about, skills, projects, experience, education, languages, contact] = await Promise.all([
      prisma.heroContent.findFirst(),
      prisma.aboutContent.findFirst(),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
      prisma.education.findMany({ orderBy: { order: 'asc' } }),
      prisma.language.findMany({ orderBy: { order: 'asc' } }),
      prisma.contactInfo.findFirst(),
    ]);

    // Create PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Helper function to check if we need a new page
    const checkPageBreak = (height: number) => {
      if (yPos + height > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Header with name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(hero?.titleEn || 'CV', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(hero?.subtitleEn || '', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Contact Information
    if (contact) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const contactInfo = [
        contact.email ? `Email: ${contact.email}` : '',
        contact.phone ? `Phone: ${contact.phone}` : '',
        contact.linkedin ? `LinkedIn: ${contact.linkedin}` : '',
        contact.github ? `GitHub: ${contact.github}` : '',
      ].filter(Boolean).join(' | ');
      
      doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;
    }

    // About Section
    if (about) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('About', 20, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const aboutText = [about.para1En, about.para2En, about.para3En].filter(Boolean).join('\n\n');
      const splitText = doc.splitTextToSize(aboutText, pageWidth - 40);
      doc.text(splitText, 20, yPos);
      yPos += splitText.length * 5 + 10;
    }

    // Experience Section
    if (experience && experience.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Experience', 20, yPos);
      yPos += 10;

      experience.forEach((exp: {
        positionEn: string;
        companyEn: string;
        periodEn: string;
        responsibilitiesEn: string;
      }) => {
        checkPageBreak(25);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.positionEn, 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        const dateRange = `${exp.companyEn} | ${exp.periodEn}`;
        doc.text(dateRange, 20, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(exp.responsibilitiesEn || '', pageWidth - 40);
        doc.text(descLines, 20, yPos);
        yPos += descLines.length * 5 + 8;
      });
    }

    // Education Section
    if (education && education.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Education', 20, yPos);
      yPos += 10;

      education.forEach((edu: {
        degreeEn: string;
        institutionEn: string;
        year: number;
      }) => {
        checkPageBreak(20);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.degreeEn, 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        const eduInfo = `${edu.institutionEn} | ${edu.year}`;
        doc.text(eduInfo, 20, yPos);
        yPos += 8;
      });
    }

    // Skills Section
    if (skills && skills.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Skills', 20, yPos);
      yPos += 10;

      const skillsByCategory = skills.reduce((acc: Record<string, string[]>, skill: {
        category: string;
        name: string;
      }) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {});

      Object.entries(skillsByCategory).forEach(([category, skillNames]) => {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(category + ':', 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const skillsText = (skillNames as string[]).join(', ');
        const splitSkills = doc.splitTextToSize(skillsText, pageWidth - 40);
        doc.text(splitSkills, 20, yPos);
        yPos += splitSkills.length * 5 + 5;
      });
    }

    // Projects Section
    if (projects && projects.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Projects', 20, yPos);
      yPos += 10;

      projects.forEach((project: {
        titleEn: string;
        descEn: string;
        techStack: string;
        liveUrl: string;
        githubUrl: string;
      }) => {
        checkPageBreak(25);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(project.titleEn, 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(project.descEn, pageWidth - 40);
        doc.text(descLines, 20, yPos);
        yPos += descLines.length * 5 + 3;

        if (project.techStack) {
          doc.setFont('helvetica', 'italic');
          try {
            const technologies = JSON.parse(project.techStack);
            const techText = 'Technologies: ' + technologies.join(', ');
            const techLines = doc.splitTextToSize(techText, pageWidth - 40);
            doc.text(techLines, 20, yPos);
            yPos += techLines.length * 5;
          } catch {
            // Skip if tech stack is not valid JSON
          }
        }

        if (project.liveUrl || project.githubUrl) {
          doc.setFont('helvetica', 'normal');
          const links = [
            project.liveUrl ? `Demo: ${project.liveUrl}` : '',
            project.githubUrl ? `GitHub: ${project.githubUrl}` : '',
          ].filter(Boolean).join(' | ');
          doc.text(links, 20, yPos);
          yPos += 5;
        }
        yPos += 5;
      });
    }

    // Languages Section
    if (languages && languages.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Languages', 20, yPos);
      yPos += 10;

      languages.forEach((lang: {
        languageEn: string;
        proficiencyEn: string;
      }) => {
        checkPageBreak(8);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${lang.languageEn} - ${lang.proficiencyEn}`, 20, yPos);
        yPos += 6;
      });
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV_${hero?.titleEn?.replace(/\s/g, '_') || 'Resume'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
