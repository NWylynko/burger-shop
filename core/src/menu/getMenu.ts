
type MenuItem = {
  id: string;
}

type Menu = MenuItem[]

interface Functions {
  listMenu: () => Promise<Menu>
}

export const getMenu = (functions: Functions) => async () => {
  const menu = await functions.listMenu()

  return {
    menu
  }
}