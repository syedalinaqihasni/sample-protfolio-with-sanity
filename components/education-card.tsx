'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, GraduationCap } from 'lucide-react';
import { BlockContent } from '@/components/ui/block-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EducationProps {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: any;
}

export function EducationCard({
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  current,
  description,
}: EducationProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedStartDate = format(new Date(startDate), 'MMM yyyy');
  const formattedEndDate = endDate ? format(new Date(endDate), 'MMM yyyy') : 'Present';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="h-full transition-shadow duration-300 hover:shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                <CardTitle className="text-xl font-bold">{degree}</CardTitle>
              </div>
              {fieldOfStudy && (
                <CardDescription className="mt-1 text-base">{fieldOfStudy}</CardDescription>
              )}
              <CardDescription className="text-base font-medium mt-1">
                {institution}
              </CardDescription>
            </div>
            {current && <Badge className="ml-2">Current</Badge>}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {formattedStartDate} — {formattedEndDate}
            </span>
          </div>
        </CardHeader>
        
        {description && (
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <BlockContent value={description} />
            </div>
          </CardContent>
        )}
      </Card>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 4 }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-primary rounded-b-lg overflow-hidden"
        />
      )}
    </motion.div>
  );
}