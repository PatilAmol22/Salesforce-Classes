import { LightningElement } from 'lwc';
import fullCalendar from '@salesforce/resourceUrl/fullcalendar'
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
export default class CaledarEvent extends LightningElement {
    alreadyLoaded = false;
    renderedCallback(){
       // if(this.alreadyLoaded) return;
        this.alreadyLoaded = true;
 
        Promise.all([
            loadScript(this,fullCalendar+'/packages/core/main.min.js'),
            loadStyle(this,fullCalendar+'/packages/core/main.min.css'),
             
             
 
        ])
        .then(()=>{
           Promise.all([
            loadScript(this,fullCalendar+'/packages/interaction/main.min.js'),
 
            loadScript(this,fullCalendar+'/packages/daygrid/main.min.js'),
            loadStyle(this,fullCalendar+'/packages/daygrid/main.min.css'),
 
            loadScript(this,fullCalendar+'/packages/timegrid/main.min.js'),
            loadStyle(this,fullCalendar+'/packages/timegrid/main.min.css'),
            loadScript(this,fullCalendar+'/packages/list/main.min.js'),
            loadStyle(this,fullCalendar+'/packages/list/main.min.css')
           ])
           .then(()=>{
            this. initCalendar();
           });
            
        })
        .catch(error => {
            console.error({
                message : 'error while loading calendar',
                error
            });
        })
    }
 
    initCalendar(){
        const calendarDiv = this.template.querySelector('div.fullcalendar');
        var calendar = new FullCalendar.Calendar(calendarDiv,{
            plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
            //height: 'parent',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            defaultView: 'dayGridMonth',
            defaultDate: '2020-05-12',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                title: 'All Day Event',
                start: '2020-05-01',
                },
                {
                title: 'Long Event',
                start: '2020-05-07',
                end: '2020-05-10'
                },
                {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-05-09T16:00:00'
                },
                {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-05-16T16:00:00'
                },
                {
                title: 'Conference',
                start: '2020-05-11',
                end: '2020-05-13'
                },
                {
                title: 'Meeting',
                start: '2020-05-12T10:30:00',
                end: '2020-05-12T12:30:00'
                },
                {
                title: 'Lunch',
                start: '2020-05-12T12:00:00'
                },
                {
                title: 'Meeting',
                start: '2020-05-12T14:30:00'
                },
                {
                title: 'Happy Hour',
                start: '2020-05-12T17:30:00'
                },
                {
                title: 'Dinner',
                start: '2020-05-12T20:00:00'
                },
                {
                title: 'Birthday Party',
                start: '2020-05-13T07:00:00'
                },
                {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-05-28'
                }
            ]
        });
 
        calendar.render();
    }
}