@isTest
public class TestVerifyDate {

    static testmethod void WithinMonthCheckDates(){
        Date date1 = date.today();
        Date date2 = date.today().addDays(15);
        Date date3 = date.today().addDays(45);
        Date date4 = date.today().addDays(-10);

        Date newDate = VerifyDate.CheckDates(date1,date2);
        System.assertEquals(date2, newDate);

        Date newDate2 = VerifyDate.CheckDates(date1,date3);
        System.assertEquals(date2, newDate);

        Date newDate3 = VerifyDate.CheckDates(date1,date4);
        System.assertEquals(date2, newDate);

       }
}