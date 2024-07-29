import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const days = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), days).toISOString();

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${days}`],
  });

  return { bookings, isLoadingBookings, days };
}
