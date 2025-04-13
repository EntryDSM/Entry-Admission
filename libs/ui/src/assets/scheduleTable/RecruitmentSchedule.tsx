import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface RecruitmentScheduleItemProps {
  category: string;
  date: string;
  location: string;
}

interface RecruitmentNoteProps {
  notes: string[];
}

interface RecruitmentScheduleProps {
  scheduleItems: RecruitmentScheduleItemProps[];
  notes: string[];
}

// 개별 일정 항목
const ScheduleItem = ({
  category,
  date,
  location,
}: RecruitmentScheduleItemProps) => {
  return (
    <TableRow>
      <CategoryCell>{category}</CategoryCell>
      <TableCell>{date}</TableCell>
      <TableCell>{location}</TableCell>
    </TableRow>
  );
};

// 비고 항목
const NoteItem = ({ notes }: RecruitmentNoteProps) => {
  return (
    <TableRow>
      <CategoryCell>비고</CategoryCell>
      <TableCell colSpan={2}>
        <NoteList>
          {notes.map((note, index) => (
            <NoteListItem key={index}>
              {index + 1}. {note}
            </NoteListItem>
          ))}
        </NoteList>
      </TableCell>
    </TableRow>
  );
};

// 메인 테이블
export const RecruitmentSchedule = ({
  scheduleItems,
  notes,
}: RecruitmentScheduleProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>구분</TableHeaderCell>
            <TableHeaderCell>일정</TableHeaderCell>
            <TableHeaderCell>장소</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleItems.map((item, index) => (
            <ScheduleItem
              key={index}
              category={item.category}
              date={item.date}
              location={item.location}
            />
          ))}
          <NoteItem notes={notes} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
  max-width: 900px;
  overflow-x: auto;
  margin: 20px auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${colors.gray[200]};
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const TableHead = styled.thead`
  background-color: ${colors.gray[100]};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${colors.orange[700]};
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray[200]};
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: center;
  font-weight: 600;
  color: ${colors.gray[500]};
  border-right: 1px solid ${colors.gray[200]};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CategoryCell = styled.td`
  padding: 12px 15px;
  text-align: center;
  border-right: 1px solid ${colors.gray[200]};
  background-color: ${colors.gray[100]};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  text-align: center;
  border-right: 1px solid ${colors.gray[200]};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const NoteList = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  text-align: left;
`;

const NoteListItem = styled.li`
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;
