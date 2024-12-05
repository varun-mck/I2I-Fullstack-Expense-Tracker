import { renderHook, act } from '@testing-library/react-hooks';
import useDateRangeData from './useDateRangeData';
import UserService from '../services/UserService';

jest.mock('../services/UserService');

describe('useDateRangeData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch data correctly for given start and end dates', async () => {
        const startDate = '2023-01-01';
        const endDate = '2023-01-31';
        const mockData = {
            income: [{ amount: 1000, date: '2023-01-10' }],
            spending: [{ amount: 500, date: '2023-01-15' }]
        };

        UserService.getDataForDateRange.mockResolvedValue(mockData);

        const { result, waitForNextUpdate } = renderHook(() => useDateRangeData(startDate, endDate));

        expect(result.current.loading).toBe(true);
        
        await waitForNextUpdate();

        expect(UserService.getDataForDateRange).toHaveBeenCalledWith(startDate, endDate);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.data).toEqual(mockData);
    });

    it('should handle error state if fetching data fails', async () => {
        const startDate = '2023-01-01';
        const endDate = '2023-01-31';
        const mockError = new Error('Failed to fetch data');

        UserService.getDataForDateRange.mockRejectedValue(mockError);

        const { result, waitForNextUpdate } = renderHook(() => useDateRangeData(startDate, endDate));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(UserService.getDataForDateRange).toHaveBeenCalledWith(startDate, endDate);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(mockError);
        expect(result.current.data).toBe(null);
    });

    it('should initialize with no data and no error', async () => {
        const { result } = renderHook(() => useDateRangeData(null, null));

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.data).toBe(null);
    });
});
