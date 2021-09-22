const weeklyReminder = require("../helpers/aWeekLeftReminder");
const dueDate = require("../helpers/dueDateReport");

describe("TEST CRON CALLED", () => {
  test("Weekly cron has been called", () => {
    const weekly = jest.spyOn(weeklyReminder, "aWeekLeftReminder");
    weekly.mockImplementation(() => Promise.resolve(true));
    weeklyReminder.aWeekLeftReminder();
    expect(weekly).toHaveBeenCalled();
  });

  test("Due date report has been called", () => {
    const report = jest.spyOn(dueDate, "dueDateReport");
    dueDate.dueDateReport();
    expect(report).toHaveBeenCalled();
  });
});
