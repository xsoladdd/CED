import { Story, ComponentMeta } from "@storybook/react";
import Component from ".";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import { textArgsTypes } from "./helper";
import { ITextProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Text`,
  component: Component,
};
export default story;

const Template: Story<ITextProps> = (args) => (
  <StoryWrapper>
    <Component {...args} />
  </StoryWrapper>
);

export const Text = Template.bind({});
Text.argTypes = textArgsTypes;
Text.args = {
  children: `hello world`,
  variant: `h1`,
};

const dummyHeader = "Greetings from ";

export const Examples: Story<ITextProps> = () => (
  <StoryWrapper>
    <Component variant="h1">{dummyHeader} H1</Component>
    <Component variant="h2">{dummyHeader} H2</Component>
    <Component variant="h3">{dummyHeader} H3</Component>
    <Component variant="h4">{dummyHeader} H4</Component>
    <Component variant="error">error</Component>

    <Component>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
      molestiae fuga magnam possimus error amet, commodi animi, dicta itaque
      incidunt adipisci, earum veritatis porro sed temporibus harum perferendis
      iste suscipit? Fugit deleniti enim nam alias repudiandae eaque doloremque
      doloribus rem odit impedit et iusto magni, atque porro inventore a
      incidunt? Incidunt velit porro error reiciendis distinctio quae earum,
      voluptatem nemo?
    </Component>
  </StoryWrapper>
);
