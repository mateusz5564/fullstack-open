interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}

interface CourseGroupPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CoursePartSpecial extends CoursePartWithDescription {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseGroupPart | CourseSubmissionPart | CoursePartSpecial;
