import { defineField, defineType } from "sanity";

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Degree / Certificate",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of Study",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "current",
      title: "Currently Studying",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "End Date, New",
      name: "endDateDesc",
      by: [{ field: "endDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "degree",
      subtitle: "institution",
    },
  },
});
