import type { Meta, StoryObj } from '@storybook/react';
import MeetingDetailHeader from '../MeetingDetailHeader';
import { Gathering } from '@/types/gathering';

const meta: Meta<typeof MeetingDetailHeader> = {
  title: 'Meeting/MeetingDetailHeader',
  component: MeetingDetailHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGathering: Gathering = {
  teamId: '1',
  id: 1,
  type: 'DALLAEMFIT' as any,
  name: '건대입구 달라임핏 모임',
  dateTime: '2024-01-20T10:00:00Z',
  registrationEnd: '2024-01-19T18:00:00Z',
  location: '건대입구',
  participantCount: 8,
  capacity: 12,
  image: '/images/meeting-placeholder.jpg',
  createdBy: 1
};

export const Default: Story = {
  args: {
    gathering: mockGathering,
  },
};

export const FullCapacity: Story = {
  args: {
    gathering: {
      ...mockGathering,
      participantCount: 12,
      capacity: 12,
    },
  },
};

export const AlmostFull: Story = {
  args: {
    gathering: {
      ...mockGathering,
      participantCount: 11,
      capacity: 12,
    },
  },
};

export const DifferentType: Story = {
  args: {
    gathering: {
      ...mockGathering,
      type: 'OFFICE_STRETCHING' as any,
      name: '사무실 스트레칭 모임',
      location: '홍대입구',
    },
  },
};
