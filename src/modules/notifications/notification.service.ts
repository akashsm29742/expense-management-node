import { eventBus } from "../../core/event-bus";
import { EVENTS } from "../../events/events";

export function registerNotificationHandlers() {
  eventBus.on(EVENTS.EXPENSE_SUBMITTED, (exp) => {
    console.log("[SEND EMAIL] Manager notified of new expense", exp.expenseId);
  });

  eventBus.on(EVENTS.EXPENSE_APPROVED, (exp) => {
    console.log("[SEND EMAIL] Employee notified of approval", exp._id);
  });

  eventBus.on(EVENTS.EXPENSE_REJECTED, (exp) => {
    console.log("[SEND EMAIL] Employee notified of rejection", exp._id);
  });

  eventBus.on(EVENTS.ROLE_ASSIGNED, async ({ userId, email, roleName }) => {
    const message = `Role assigned/changed to '${roleName}' for userId - ${userId} and email- (${email})`;
    console.log("[SEND EMAIL] Role assignment notification:", message);
  });
}
