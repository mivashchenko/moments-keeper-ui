export type TimelineEventType = {
  time: string;
  content: {
    title: string;
    description: string;
  };
  label?: string;
  dimension: string;
};
