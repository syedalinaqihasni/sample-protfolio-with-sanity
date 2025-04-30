"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { BlockContent } from "@/components/ui/block-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: any;
}

export function ExperienceCard({
  title,
  company,
  location,
  startDate,
  endDate,
  current,
  description,
}: ExperienceProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedStartDate = format(new Date(startDate), "MMM yyyy");
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMM yyyy")
    : "Present";

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
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="text-base font-medium mt-1">
                {company}
              </CardDescription>
            </div>
            {current && <Badge className="ml-2">Current</Badge>}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {formattedStartDate} — {formattedEndDate}
              </span>
            </div>

            {location && (
              <div className="flex items-center sm:ml-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <BlockContent value={description} />
          </div>
        </CardContent>
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
