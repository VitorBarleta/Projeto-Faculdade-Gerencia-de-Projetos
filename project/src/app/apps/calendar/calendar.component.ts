import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewEventComponent } from './new-event/new-event.component';
import { CalendarService } from './calendar.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

    public isLoading: boolean = true;

    public daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    public monthOfYear = [
        { month: 'Janeiro', color: '255, 255, 255' },
        { month: 'Fevereiro', color: '255, 165, 0' },
        { month: 'Março', color: '0, 0, 255' },
        { month: 'Abril', color: '0, 128, 0' },
        { month: 'Maio', color: '255, 255, 0' },
        { month: 'Junho', color: '255, 0, 0' },
        { month: 'Julho', color: '255, 255, 0' },
        { month: 'Agosto', color: '218, 165, 32' },
        { month: 'Setembro', color: '0, 128, 0' },
        { month: 'Outubro', color: '238, 130, 238' },
        { month: 'Novembro', color: '0, 0, 255' },
        { month: 'Dezembro', color: '255, 0, 0' }
    ]

    public dayInitCalendar: number;
    public dayEndCalendar: number;
    public currentDay: number = new Date().getDate();
    public currentMonth: number;
    public currentYear: number;
    public currentMonthFull: string;

    public calendar = [];

    public AllEvents;

    constructor(private dialog: MatDialog, private calendarService: CalendarService) { }

    openDialog(day: string, event: Array<any>): void {
        const dialogRef = this.dialog.open(NewEventComponent, {
            maxHeight: '610px',
            width: '900px',
            data: {
                year: this.currentYear,
                month: this.currentMonth,
                monthFull: this.currentMonthFull,
                day: day,
                events: event
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    ngOnInit() {
        this.getAllEvents();
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.getMonthDays();
    }

    public calculateLeapYear(year: number) {
        this.daysInMonth[1] = year % 4 == 0 ? 29 : 28;
    }

    public beforeMonth(): void {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.indexDay = 0;
        this.getMonthDays();
        this.putEvents(this.AllEvents);
    }

    public nextMonth(): void {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }

        this.indexDay = 0;
        this.getMonthDays();
        this.putEvents(this.AllEvents);
    }

    public getMonthDays(): void {
        let day: number, month: number, year: number, monthBefore: number;
        day = 1;
        month = this.currentMonth;
        monthBefore = month - 1;
        year = this.currentYear;
        this.calculateLeapYear(year);

        if (month == 0) monthBefore = 11;
        this.dayInitCalendar = this.daysInMonth[monthBefore] - this.calculateWeekDay(year, month, day) + 1;
        this.dayEndCalendar = 6 - this.calculateWeekDay(year, month, this.daysInMonth[month]);
        if ((this.daysInMonth[month] + this.dayEndCalendar) < 35) {
            this.dayEndCalendar += 7;
        }

        day = this.dayInitCalendar;
        for (let i = 0; i < 42; i++) {
            if (day > this.daysInMonth[monthBefore]) {
                day = 1;
                monthBefore = month;
            }
            this.calendar[i] = Object.assign({ day: day, isEnabled: this.isDisabled(day), events: [] });
            this.calendar[i].events.splice(0);
            day++;
        }
        this.chooseMonthColor(this.monthOfYear[this.currentMonth].color);
        this.currentMonthFull = this.monthOfYear[this.currentMonth].month;
    }

    private chooseMonthColor(month: string): void {
        document.getElementById('month-color').style.backgroundColor = `rgba(${month}, 0.4)`;
    }

    public calculateWeekDay(year: number, month: number, day: number): number {
        return new Date(year, month, day).getDay();
    }

    private indexDay: number = 0;

    public isDisabled(day: number): boolean {
        if (day == 1 && this.indexDay < 1) {
            this.indexDay++;
            return false;
        } else if (day == 1 && this.indexDay == 1) {
            this.indexDay++;
            return true;
        }
        else if (day > 1 && this.indexDay == 1) {
            return false;
        }
        else return true;
    }

    //métodos da service
    //
    //

    private getAllEvents(): void {
        this.calendarService.getAll().subscribe(res => {
            this.AllEvents = res;
            this.putEvents(res);
        })
    }

    public putEvents(events): void {
        events.forEach(value => {
            value.event.forEach(day => {
                for (let i = 0; i < 42; i++) {
                    if ((this.calendar[i].day < 10 ? '0' : '') +
                        `${this.calendar[i].day}/${this.currentMonth + 1}/${this.currentYear}` == day.startDay
                        && !this.calendar[i].isDisabled) {
                        this.calendar[i].events.push(day);
                    }
                }
            })
        })
        this.isLoading = false;
    }
}
