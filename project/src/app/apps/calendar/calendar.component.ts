import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

    public daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    public daysOfMonth = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    public dayInitCalendar: number;
    public dayEndCalendar: number;
    public currentDay: number;
    public currentMonth: number;
    public currentYear: number;
    public currentMonthFull: string;

    public calendar: number[] = [];

    constructor() { }

    ngOnInit() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.getDate();
    }

    public calculateLeapYear(year: number) {
        this.daysInMonth[1] = year % 4 == 0 ? 29 : 28;
    }

    public beforeMonth(): void{
      this.currentMonth--;
      if(this.currentMonth < 0){
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.getDate();
    }

    public nextMonth(): void{
        this.currentMonth++;
        if(this.currentMonth > 11){
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.getDate();
    }

    public getDate(): void {
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
            this.calendar[i] = day;
            day++;
        }
        this.currentMonthFull = this.daysOfMonth[this.currentMonth];
    }

    public calculateWeekDay(year: number, month: number, day: number): number {
        return new Date(year, month, day).getDay();
    }

    private indexDay: number = 0;

    /*public isDisabled(day: number): boolean {
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
    }*/
}
