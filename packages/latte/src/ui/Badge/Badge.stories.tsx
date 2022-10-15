import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import Button from "../Button";
import { badgeArgsTypes } from "./helper";
import { IBadgeProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Button`,
  component: Component,
  argTypes: badgeArgsTypes,
};
export default story;

const Template: Story<IBadgeProps> = (args) => (
  <StoryWrapper>
    <Component {...args}>
      <Button>Sample</Button>
    </Component>
  </StoryWrapper>
);

export const Badge = Template.bind({});
Badge.args = {
  color: "primary",
  text: "100",
};
