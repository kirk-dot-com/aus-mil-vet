export interface Resource {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  resources?: Resource[];
}

export interface TransitionStep {
  id: string;
  title: string;
  description: string;
  order: number;
  items: ActionItem[];
  isCompleted: boolean;
}

export interface UserTransitionProgress {
    userId: string;
    completedStepIds: string[];
    completedActionItemIds: string[];
}
