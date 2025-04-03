import type { TErrorMsg } from "@/shared/application/errors-msgs.js";

const menuErrorMessages = {
  // Bad Request (400)
  INVALID_MENU_DATA: "Dados do menu inválidos",
  INVALID_SECTION_DATA: "Dados da seção inválidos",
  INVALID_ITEM_DATA: "Dados do item inválidos",
  INVALID_MODIFIER_DATA: "Dados do modificador inválidos",

  // Not Found (404)
  MENU_NOT_FOUND: "Menu não encontrado",
  SECTION_NOT_FOUND: "Seção não encontrada",
  ITEM_NOT_FOUND: "Item não encontrado",
  MODIFIER_NOT_FOUND: "Modificador não encontrado",

  // Conflict (409)
  MENU_ALREADY_EXISTS: "Menu já existe",
  SECTION_ALREADY_EXISTS: "Seção já existe",
  ITEM_ALREADY_EXISTS: "Item já existe",
  MODIFIER_ALREADY_EXISTS: "Modificador já existe",
} satisfies TErrorMsg;

export { menuErrorMessages };
