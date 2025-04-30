'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsProps) {
  const categories = [...new Set(skills.map((skill) => skill.category))];
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredSkills = skills.filter(
    (skill) => selectedCategory === 'all' || skill.category === selectedCategory
  );

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and expertise.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
              All
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <Badge variant="outline">{skill.category}</Badge>
                  </div>
                  <Progress value={skill.proficiency * 20} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.proficiency - 1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}