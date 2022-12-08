trigger ClosedOpportunityTrigger on Opportunity (after insert, after update) {


    List<Task> tasksToCreate = new List<Task>();

    for (Opportunity a : Trigger.new) {

        if (a.StageName == 'Closed Won') {

            Task newTask = new Task();
            newTask.Subject = 'Follow Up Test Task';
            newTask.WhatId = a.Id;

            tasksToCreate.add(newTask);

        }
    } 

    if (tasksToCreate.size() > 0) {
        insert tasksToCreate;
    }
}