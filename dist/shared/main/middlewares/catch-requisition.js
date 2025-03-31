import { SaveLogs } from "../../application/save-logs.js";
export function catchRequisition(request, _response, next) {
    SaveLogs.ExpressInput(request);
    next();
}
//# sourceMappingURL=catch-requisition.js.map