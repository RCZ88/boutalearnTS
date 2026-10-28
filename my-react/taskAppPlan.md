Oh, you mean the actual features and sections of the task dashboard, not React components. My bad.

## Task dashboard specification

[Waaqi AI Cyber GRC Platform | ISO 27001, ADHICS, PDPL](https://images.openai.com/static-rsc-4/VLX2eUKCux5F3BygfycV44e6vlbkarNG7-22vCrylynnf6ucNc9Bin7unofTZyyU1mRjoOT-3CgzPJhXDrQn6-mRbByPC-6iHdm-dt2kI-hTxoIoRG5oUQJT9A8FKeZoU29UmJ-B724M4taaRYT_j3tu_VttybbJ9D1LoXzrzuk?purpose=inline)

1\. Task statistics

- Total tasks
- Completed tasks
- Pending tasks
- Completion percentage

[Build a Web App with Manus and Deploy with DeployHQ](https://images.openai.com/static-rsc-4/lJ9RvQ1JV0hvHFe8PnpL-hwACVBqPwJ6LJ7r59WaFtfHtzXU4VONgIy6VZSsBJhEedBVlH6hnGhWqx-ewXSjxCcFun-aMPisTVNwgKmAo4K2C2YimA5QOSCayiitQIKiu7E3-jNmwmUrn7k778tXULYQiYlTzWXusdv2uyd6uyk?purpose=inline)

2\. Task list

- Task title
- Completion checkbox or button
- Status: pending or completed
- Delete task action

[Daily Task Manager | Devpost](https://images.openai.com/static-rsc-4/alXrzM7QNZzsG91A-mbItyLGyONsoWt8TTt8Yj0ZCuawhY8SeG3eyI83xQ4gzN2QkYbvmzHdSgvN7CVlx9zbZMSzdPq9-tImqAzfgs_EbLQ8tyHnsAgZ5EHwYgtW2xbEAFrdvEPauctQUHbgRK8LkqdEzg-WRMMkjN5vngAnnYk?purpose=inline)

3\. Add task

- Text input for task title
- Add button
- Validation for empty titles

[TaskFlow: Modern Web-Based To-Do & Task Management System With Dark Mode Source Code - SellAnyCode](https://images.openai.com/static-rsc-4/D0joIbVcZaXD7oFZXvYKVcytqpwCxY1g8DNhcEC8PRKTUJpobiKPW0csUpfp20_KdstSV1hPoA5a79auuOMOHhfJcPchH1JxUlqDh13RrheGMBZBUAoQgc9zdoY2sASFg6mobJJ5H5qvH99QOJPAacuAT9WqqNYgoqwdlouRw6M?purpose=inline)

4\. Task filters

- All tasks
- Pending tasks
- Completed tasks
- Optional search bar

[TaskFlow: Modern Task & Daily Checklist · Built with Blink](https://images.openai.com/static-rsc-4/lUvvtbfUh3PuIYPGxQEFedlV45zl98njLTSD1y9wQvRtZU8P8lEfL8Rej82CZHa-hZp14SOjiI5ec1uK31IU_brzu92nz40ENM9d1oRmqWtkf1BzUhnUQK_DROzwIaCfiiYM1eIfQqugoHaMY9YL1rT2LHJJkRw_V8Q9uLoMoSs?purpose=inline)

5\. Empty states

- No tasks created yet
- No tasks match the selected filter
- Helpful message prompting the user to add a task

## What we're building first

Keep the initial version small:

- Statistics: total, completed, pending, completion percentage.
- Task list: view, complete, and delete tasks.
- Add task: create tasks.
- Filters: all, pending, completed.
- Persistence: keep tasks after refreshing the page using `localStorage`.

We can leave editing tasks, due dates, priorities, categories, and user accounts for later.

The point of the reusable card is that the statistics, task list, and add-task form can each sit inside their own card while sharing the same visual design.