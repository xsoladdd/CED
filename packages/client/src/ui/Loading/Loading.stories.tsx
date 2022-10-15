import { Story } from '@storybook/react';
import LoadingComponent from '.';
import { loaderArgsType } from './helper';
import { ILoadingProps } from './types';

export default {
  title: `Common Component/Loader`,
  component: LoadingComponent,
};

const Template: Story<ILoadingProps> = (args) => <LoadingComponent {...args} />;

export const Loader = Template.bind({});

Loader.argTypes = loaderArgsType;

Loader.args = {
  size: 'lg',
};
