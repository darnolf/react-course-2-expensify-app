import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters';


class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));       
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value))
                }} />

                <select
                    value={this.props.filters.sortyBy }
                    onChange={(e) => {
                        if (e.target.value === 'amount') {
                            this.props.dispatch(sortByAmount())
                        } else if(e.target.value === 'date') {
                            this.props.dispatch(sortByDate())
                        }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>            
                </select>
                <DateRangePicker 
                     startDate={this.props.filters.startDate}
                     endDate={this.props.filters.endDate}
                     onDatesChange={this.onDatesChange}
                     focusedInput={this.state.calendarFocused}
                     onFocusChange={this.onFocusChange}
                     numberOfMonths={1}
                     isOutsideRange={() => false}
                     showClearDates={true}
                
                
                />


            </div>            
        )
    }
}




const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }    
}

export default connect(mapStateToProps)(ExpenseListFilters);




/* 
This filter has to be connected to the current state of the filter: setTextFilter('water')
So we need to connect it to the store so it is syncronized
1 - Import connect first
2 - Created a connected version(instance) of ExpenseListFilters
3 - export connected version with syntax connect(modifiedComp)(originalComp);
---------------
DISPATCH EVENTS:
1 - Create onChange listener to trigger dispatcher.
2 - We need 'setTextFilter', so we import it here.
3 - Call the action and pass the e.target.value to the store.



*/