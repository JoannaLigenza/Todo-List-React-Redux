import React from 'react';
import { connect } from 'react-redux';

const DateFilter = ( {filter, filterTasks} ) => {

    const returnDate = (choosenDay) => {
        const date = new Date();
        let day = date.getDate()
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (choosenDay === "today") {
            if (day < 10) {
                day = "0"+day;
            }
        }
        if (choosenDay === "tomorrow") {
            day = day+1;
            if (day < 10) {
                day = "0"+day;
            }
        }
        if (choosenDay === "week") {
            day = day+7;
            if (day < 10) {
                day = "0"+day;
            }
        }
        return year+"-"+month+"-"+day;
    }

    const TodayDateFilter = () => {
        const today = returnDate("today");
        filterTasks("date", today, today, "");
    }

    const TomorrowDateFilter = () => {
        const tomorrow = returnDate("tomorrow");
        filterTasks("date", tomorrow, tomorrow, "");
    }

    const ThisWeekDateFilter = () => {
        const today = returnDate("today");
        const week = returnDate("week");
        filterTasks("date", today, week, "");
    }

    const handleChange = (e) => {
        const date = e.target.value;
        filterTasks("date",date, date, date);
    }
    
    return(
        <div className="ovlp-descr-select">
            <div id="choose-date">
                <div className="date-filter-item" onClick={TodayDateFilter}>Today</div>
                <div className="date-filter-item" onClick={TomorrowDateFilter}>Tomorrow</div>
                <div className="date-filter-item" onClick={ThisWeekDateFilter}>This Week</div>
                <div id="date-filter">
                    <input type="date" value={filter.date === "" ? "" : filter.date[2]} onChange={handleChange}></input>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToPost = (dispatch) => {
    return {
        filterTasks: (filter, value, endValue, string) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value, endValue: endValue, string: string} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(DateFilter);