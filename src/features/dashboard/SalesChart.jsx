import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import { useDarkMode } from '../../Context/DarkModeContext';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Header from '../../ui/Header';
import Heading from '../../ui/Heading';
import {
  eachDayOfInterval,
  format,
  formatDate,
  isSameDay,
  subDays,
} from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const darkColors = {
  totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
  extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
  text: '#e5e7eb',
  background: '#18212f',
};

const lightColors = {
  totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
  extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
  text: '#374151',
  background: '#fff',
};

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extraPrice, 0),
    };
  });

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales : from {formatDate(allDates.at(1), 'MMM dd yyyy')} &mdash;{' '}
        {formatDate(allDates.at(-1), 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
