import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import Text from "../Text";
import { tableArgsTypes } from "./helper";
import { mockData } from "./mockData";
import { ITableProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Table`,
  component: Component,
};
export default story;

export const Table: Story<ITableProps> = (args) => (
  <StoryWrapper>
    <Component {...args} columns={mockData.col}>
      {mockData.data
        .slice(0, 5)
        .map(
          (
            { Job, Name, company, id, location, favoriteColor, lastLogin },
            idx
          ) => (
            <tr key={idx}>
              <th>{id}</th>
              <td>{Name}</td>
              <td>{Job}</td>
              <td>{company}</td>
              <td>{location}</td>
              <td>{lastLogin}</td>
              <td>{favoriteColor}</td>
            </tr>
          )
        )}
    </Component>
  </StoryWrapper>
);
Table.argTypes = tableArgsTypes;

export const Example1: Story<ITableProps> = (args) => (
  <StoryWrapper>
    <Text variant="h4" className="py-4">
      Table normal + one active cell
    </Text>
    <Component {...args} columns={mockData.col}>
      {mockData.data
        .slice(0, 5)
        .map(
          (
            { Job, Name, company, id, location, favoriteColor, lastLogin },
            idx
          ) => (
            <tr key={idx} className={idx === 1 ? "active" : ""}>
              <th>{id}</th>
              <td>{Name}</td>
              <td>{Job}</td>
              <td>{company}</td>
              <td>{location}</td>
              <td>{lastLogin}</td>
              <td>{favoriteColor}</td>
            </tr>
          )
        )}
    </Component>
  </StoryWrapper>
);

export const Example2: Story<ITableProps> = (args) => (
  <StoryWrapper>
    <Text variant="h4" className="py-4">
      Table compact + zebra + hover effect
    </Text>
    <Component {...args} columns={mockData.col} isCompact={true} isZebra>
      {mockData.data
        .slice(0, 5)
        .map(
          (
            { Job, Name, company, id, location, favoriteColor, lastLogin },
            idx
          ) => (
            <tr key={idx} className="hover">
              <th>{id}</th>
              <td>{Name}</td>
              <td>{Job}</td>
              <td>{company}</td>
              <td>{location}</td>
              <td>{lastLogin}</td>
              <td>{favoriteColor}</td>
            </tr>
          )
        )}
    </Component>
  </StoryWrapper>
);
export const Example3: Story<ITableProps> = (args) => (
  <StoryWrapper>
    <Text variant="h4" className="py-4">
      Table Loading
    </Text>
    <Component
      {...args}
      columns={mockData.col}
      isCompact={true}
      isLoading
    ></Component>
  </StoryWrapper>
);

export const Example4: Story<ITableProps> = (args) => (
  <StoryWrapper>
    <Text variant="h4" className="py-4">
      Empty Table
    </Text>
    <Component
      {...args}
      columns={mockData.col}
      isEmpty={true}
      isCompact
    ></Component>
  </StoryWrapper>
);
