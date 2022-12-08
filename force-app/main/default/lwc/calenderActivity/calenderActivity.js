
import { LightningElement,api,track } from 'lwc';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalenderV3';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CalenderActivity extends LightningElement {
    jsInitialised = false;
    @track _events;

    @api
    get events() {
        return this._events;
    }
    set events(value) {
        this._events=[...value];
    }


    @api
    get eventDataString() {
        return this.events;
    }
    set eventDataString(value) {
        try
        {
            this.events=eval(value);
        }
        catch{
           this.events=[];
        }
    }

  renderedCallback() {

    // Performs this operation only on first render
    if (this.jsInitialised) {
      return;
    }
    this.jsInitialised = true;

    Promise.all([
      loadScript(this, FullCalendarJS + '/FullCalenderV3/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalenderV3/moment.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalenderV3/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/FullCalenderV3/fullcalendar.min.css')
    ])
    .then(() => {
      this.initialiseCalendarJs();
    })
    .catch(error => {
        alert(error);
        new ShowToastEvent({
            title: 'Error!',
            message: error,
            variant: 'error'
        })
    })
  }

  initialiseCalendarJs() { 
    /*var that=this;
    const ele = this.template.querySelector('div.fullcalendarjs');
    //Use jQuery to instantiate fullcalender JS
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
      defaultDate: new Date(),
      navLinks: true, 
      editable: true,
      eventLimit: true,
      events: this.events,
      dragScroll:true,
      droppable:true,
      weekNumbers:true,
      selectable:true,
      //eventClick: this.eventClick,
      eventClick: function (info) {
        const selectedEvent = new CustomEvent('eventclicked', { detail: info.Id });
        // Dispatches the event.
        that.dispatchEvent(selectedEvent);
        }
    });
  }*/
    var that=this;
    const ele = this.template.querySelector('div.fullcalendarjs');
    //Use jQuery to instantiate fullcalender JS
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
      defaultDate: new Date(),
      
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.events,
      dragScroll:true,
      droppable:true,
      weekNumbers:true,
      selectable:true,
      //eventClick: this.eventClick,
     /* eventClick: function (info) {
        const selectedEvent = new CustomEvent('eventclicked', { detail: info.Id });
        // Dispatches the event.
        that.dispatchEvent(selectedEvent);*/
      events: [
          {
          title: 'All Day Event',
          start: '2022-07-009',
          },
          {
          title: 'Long Event',
          start: '2022-05-09',
          end: '2022-05-10'
          },
          {
          groupId: 999,
          title: 'Repeating Event',
          start: '2022-05-09T16:00:00'
          },
          {
          groupId: 999,
          title: 'Repeating Event',
          start: '2022-05-16T16:00:00'
          },
          {
          title: 'Conference',
          start: '2022-05-11',
          end: '2022-05-13'
          },
          {
          title: 'Meeting',
          start: '2022-05-12T10:30:00',
          end: '2022-05-12T12:30:00'
          },
          {
          title: 'Lunch',
          start: '2020-11-04T12:00:00'
          },
          {
          title: 'Meeting',
          start: '2020-11-05T14:30:00'
          },
          {
          title: 'Happy Hour',
          start: '2022-11-12T17:30:00'
          },
          {
          title: 'Dinner',
          start: '2022-11-12T20:00:00'
          },
          {
          title: 'Birthday Party Saurabh Pandey',
          start: '2022-11-13T07:00:00'
          },
          {
          title: 'Visit Google',
          url: 'http://google.com/',
          start: '2022-11-28'
          }
      ]
  });

 // calendar.render();
}
}