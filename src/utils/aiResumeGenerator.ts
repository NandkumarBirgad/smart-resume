interface AIResumeParams {
  targetRole: string;
  industry: string;
  experienceLevel: string;
}

export async function generateAIResume(params: AIResumeParams) {
  // Simulate AI generation with realistic data based on role and industry
  const { targetRole, industry, experienceLevel } = params;
  
  // Extract experience years from level
  const experienceYears = experienceLevel.includes('Entry') ? 1 : 
                         experienceLevel.includes('Mid') ? 4 : 
                         experienceLevel.includes('Senior') ? 8 : 12;

  const roleTemplates = {
    'Software Engineer': {
      summary: `Passionate ${targetRole.toLowerCase()} with ${experienceYears}+ years of experience in full-stack development. Proven track record of building scalable applications and leading technical initiatives in ${industry.toLowerCase()} environments. Strong expertise in modern frameworks, cloud technologies, and agile methodologies.`,
      skills: [
        { name: 'JavaScript', category: 'Technical', level: 'Advanced' },
        { name: 'React', category: 'Technical', level: 'Advanced' },
        { name: 'Node.js', category: 'Technical', level: 'Intermediate' },
        { name: 'Python', category: 'Technical', level: 'Intermediate' },
        { name: 'AWS', category: 'Technical', level: 'Intermediate' },
        { name: 'Git', category: 'Technical', level: 'Advanced' },
        { name: 'Problem Solving', category: 'Soft', level: 'Expert' },
        { name: 'Team Collaboration', category: 'Soft', level: 'Advanced' },
        { name: 'Agile Methodologies', category: 'Technical', level: 'Advanced' }
      ],
      experience: [
        {
          company: `${industry} Solutions Inc.`,
          position: experienceYears > 5 ? 'Senior Software Engineer' : 'Software Engineer',
          startDate: '2000-01',
          endDate: '',
          current: true,
          description: `Lead development of scalable web applications serving 100K+ users in the ${industry.toLowerCase()} sector.`,
          achievements: [
            'Architected and implemented microservices architecture reducing system latency by 40%',
            'Led a team of 5 developers in delivering critical features ahead of schedule',
            'Optimized database queries resulting in 60% improvement in application performance',
            'Implemented CI/CD pipelines reducing deployment time from hours to minutes'
          ]
        }
      ]
    },
    'Marketing Manager': {
      summary: `Results-driven ${targetRole.toLowerCase()} with ${experienceYears}+ years of experience in ${industry.toLowerCase()} marketing. Expertise in digital marketing strategies, campaign management, and data-driven decision making. Proven ability to increase brand awareness and drive revenue growth through innovative marketing initiatives.`,
      skills: [
        { name: 'Digital Marketing', category: 'Technical', level: 'Expert' },
        { name: 'Google Analytics', category: 'Technical', level: 'Advanced' },
        { name: 'SEO/SEM', category: 'Technical', level: 'Advanced' },
        { name: 'Social Media Marketing', category: 'Technical', level: 'Advanced' },
        { name: 'Content Strategy', category: 'Technical', level: 'Advanced' },
        { name: 'Leadership', category: 'Soft', level: 'Advanced' },
        { name: 'Strategic Planning', category: 'Soft', level: 'Advanced' },
        { name: 'Communication', category: 'Soft', level: 'Expert' },
        { name: 'Project Management', category: 'Soft', level: 'Advanced' }
      ],
      experience: [
        {
          company: `${industry} Marketing Group`,
          position: experienceYears > 5 ? 'Senior Marketing Manager' : 'Marketing Manager',
          startDate: '2000-01',
          endDate: '',
          current: true,
          description: `Drive comprehensive marketing strategies for ${industry.toLowerCase()} clients, managing campaigns with budgets exceeding $500K annually.`,
          achievements: [
            'Increased brand awareness by 150% through integrated digital marketing campaigns',
            'Generated 300% ROI on paid advertising campaigns across multiple channels',
            'Led cross-functional team of 8 marketing professionals',
            'Implemented marketing automation workflows increasing lead conversion by 45%'
          ]
        }
      ]
    },
    'Data Analyst': {
      summary: `Detail-oriented ${targetRole.toLowerCase()} with ${experienceYears}+ years of experience in ${industry.toLowerCase()} data analysis. Skilled in statistical analysis, data visualization, and business intelligence. Proven track record of transforming complex data into actionable insights that drive strategic business decisions.`,
      skills: [
        { name: 'Python', category: 'Technical', level: 'Advanced' },
        { name: 'SQL', category: 'Technical', level: 'Expert' },
        { name: 'Tableau', category: 'Technical', level: 'Advanced' },
        { name: 'Excel', category: 'Technical', level: 'Expert' },
        { name: 'R', category: 'Technical', level: 'Intermediate' },
        { name: 'Statistical Analysis', category: 'Technical', level: 'Advanced' },
        { name: 'Critical Thinking', category: 'Soft', level: 'Expert' },
        { name: 'Communication', category: 'Soft', level: 'Advanced' },
        { name: 'Attention to Detail', category: 'Soft', level: 'Expert' }
      ],
      experience: [
        {
          company: `${industry} Analytics Corp`,
          position: experienceYears > 5 ? 'Senior Data Analyst' : 'Data Analyst',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: `Analyze complex datasets to identify trends and patterns that inform strategic decisions in the ${industry.toLowerCase()} industry.`,
          achievements: [
            'Developed predictive models that improved forecasting accuracy by 35%',
            'Created automated reporting dashboards saving 20 hours per week',
            'Identified cost-saving opportunities worth $2M annually through data analysis',
            'Collaborated with stakeholders to define KPIs and success metrics'
          ]
        }
      ]
    }
  };

  // Get template or create generic one
  const template = roleTemplates[targetRole as keyof typeof roleTemplates] || {
    summary: `Experienced ${targetRole.toLowerCase()} with ${experienceYears}+ years in ${industry.toLowerCase()}. Proven track record of delivering results and driving growth through strategic initiatives and collaborative leadership.`,
    skills: [
      { name: 'Leadership', category: 'Soft', level: 'Advanced' },
      { name: 'Communication', category: 'Soft', level: 'Advanced' },
      { name: 'Problem Solving', category: 'Soft', level: 'Expert' },
      { name: 'Project Management', category: 'Soft', level: 'Advanced' },
      { name: 'Strategic Planning', category: 'Soft', level: 'Advanced' }
    ],
    experience: [
      {
        company: `${industry} Professional Services`,
        position: targetRole,
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: `Lead ${targetRole.toLowerCase()} initiatives in the ${industry.toLowerCase()} sector.`,
        achievements: [
          'Successfully managed multiple high-priority projects simultaneously',
          'Improved team efficiency and productivity through process optimization',
          'Collaborated with cross-functional teams to achieve organizational goals',
          'Mentored junior team members and contributed to their professional development'
        ]
      }
    ]
  };

  // Add IDs to skills and experience
  const skillsWithIds = template.skills.map(skill => ({
    ...skill,
    id: crypto.randomUUID()
  }));

  const experienceWithIds = template.experience.map(exp => ({
    ...exp,
    id: crypto.randomUUID()
  }));

  return {
    personalInfo: {
      summary: template.summary
    },
    skills: skillsWithIds,
    experience: experienceWithIds,
    targetRole: targetRole
  };
}