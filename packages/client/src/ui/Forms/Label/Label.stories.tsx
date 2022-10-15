import { Story } from '@storybook/react';
import Component from '.';
import { labelArgsTypes } from './helper';
// import { textAreaArgsTypes } from "./helper";
import { ILabelProps } from './types';

export default {
  title: `Common Component/Form/Label`,
  component: Component,
};

const Template: Story<ILabelProps> = (args) => <Component {...args} />;

export const Label = Template.bind({});
Label.args = {
  text: 'Name:',
  required: false,
};

Label.argTypes = labelArgsTypes;
// TextArea.argTypes = textAreaArgsTypes;
