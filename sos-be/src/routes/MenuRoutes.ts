import { Router } from 'express';
import { MenuController } from '../controllers/MenuController';

const MenuRoutes = Router();
const menuController = new MenuController();

MenuRoutes.post('/menus', menuController.createMenu);
MenuRoutes.get('/menus', menuController.getAllMenus);
MenuRoutes.get('/menus/:id', menuController.getMenuById);
MenuRoutes.put('/menus/:id', menuController.updateMenu);
MenuRoutes.delete('/menus/:id', menuController.deleteMenu);

export default MenuRoutes;
