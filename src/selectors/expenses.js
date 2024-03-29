import moment from 'moment'

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    
    const filteredExpenses = expenses.filter((expense) => {

        const createdAtMoment = moment(expense.createdAt)



        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    })
    
    const sortedExpenses = filteredExpenses.sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        }
        if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })

    return sortedExpenses
}

export default getVisibleExpenses