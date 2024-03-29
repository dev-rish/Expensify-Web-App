import React from 'react'
import {shallow} from 'enzyme'
import {DateRangePicker} from 'react-dates'
import moment from 'moment'
import {filters, altFilters} from '../fixtures/filters'
import {ExpenseListFilters} from '../../components/ExpenseListFilters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />)
})

test('Should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters with alternate data', () => {
    const altFilters = {
        text: 'bill',
        sortby: 'amount',
        startDate: moment(0),
        endDate: moment(0).add(3, 'days')
    }

    wrapper.setProps({
        filters: altFilters
    })

    expect(wrapper).toMatchSnapshot()
})

test('Should handle text change', () => {
    const value = 'rent'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should sort by date', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: { value }
    })

    expect(sortByDate).toHaveBeenCalled()
})

test('Should sort by date', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    })

    expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes', () => {
    const startDate = moment(0).add(4, 'years')
    const endDate = moment(0).add(8, 'years')
    wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('Should handle date focus changes', () => {
    const calendarFocused = 'endDate'
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})