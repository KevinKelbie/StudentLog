import React, { useState, useEffect } from "react";

import styled from "styled-components";

import moment from "moment";

import StepWizard from "react-step-wizard";

import Timetable from "./Timetable";

import DayPicker from "./DayPicker";

import date from "date-and-time";


function App(props) {
    useEffect(() => {
        document.title = "Timetable / StudentLog";
    }, [])

    const [selectedDate, setSelectedDate] = useState({
        _d: new Date("2020-01-04")
    });
    const [monday, setMonday] = useState(getMonday(selectedDate._d));

    useEffect(() => {
        setMonday(getMonday(selectedDate._d));
    }, [selectedDate]);

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return moment(new Date(d.setDate(diff)))
            .add(7, "days")
            .toDate();
    }

    return (
        <div {...props}>
            <StepWizard
                nav={
                    <DayPicker
                        date={monday}
                        updateDate={date => setSelectedDate(date)}
                    />
                }
            >
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(-1)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(0)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(1)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(2)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(3)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(4)}
                    />
                )}
                {selectedDate && (
                    <Timetable
                        date={monday.addDays(5)}
                    />
                )}
            </StepWizard>
        </div>
    );
}

App = styled(App)`
`;

export default App;