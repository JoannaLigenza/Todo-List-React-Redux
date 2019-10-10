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
        filterTasks("date", today, today, "today", "");
    }

    const TomorrowDateFilter = () => {
        const tomorrow = returnDate("tomorrow");
        filterTasks("date", tomorrow, tomorrow, "tomorrow", "");
    }

    const ThisWeekDateFilter = () => {
        const today = returnDate("today");
        const week = returnDate("week");
        filterTasks("date", today, week, "week", "");
    }

    const handleChange = (e) => {
        const date = e.target.value;
        filterTasks("date",date, date, "choosen-date" ,date);
    }

    const ExpiredDateFilter = () => {
        const expired = returnDate("today");
        filterTasks("date", expired, expired, "expired", "");
    }

    const AllDateFilter = () => {
        const all = returnDate("today");
        filterTasks("date", all, all, "all", "");
    }
    
    return(
        <div className="ovlp-descr-select">
            <div id="choose-date">
                <div className="date-filter-item" onClick={TodayDateFilter} style={{backgroundColor: filter.date[2] === "today" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}>Today</div>
                <div className="date-filter-item" onClick={TomorrowDateFilter} style={{backgroundColor: filter.date[2] === "tomorrow" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}>Tomorrow</div>
                <div className="date-filter-item" onClick={ThisWeekDateFilter} style={{backgroundColor: filter.date[2] === "week" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}>This Week</div>
                <div id="date-filter">
                    <input type="date" value={filter.date === "" ? "" : filter.date[3]} onChange={handleChange} style={{backgroundColor: filter.date[2] === "choosen-date" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}></input>
                </div>
                <div className="date-filter-item" onClick={ExpiredDateFilter} style={{backgroundColor: filter.date[2] === "expired" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}>Expired</div>
                <div className="date-filter-item" onClick={AllDateFilter} style={{backgroundColor: filter.date[2] === "all" ? "rgba(255,255,255, 0.6)" : "rgba(255,255,255, 0.3)"}}>All tasks</div>
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
        filterTasks: (filter, value, endValue, day, string) => { dispatch( {type: 'FILTER_TASKS', filter: filter, value: value, endValue: endValue, day: day, string: string} ) }
    }
}

export default connect(mapStateToProps, mapDispatchToPost)(DateFilter);