import { Injectable } from '@angular/core';
import { RouteExtended } from '../../models/interfaces/RouteExtended';

@Injectable()
export class RouterHelperService {

  static registry: any = {};

  constructor() { }

  static register(routes: RouteExtended[]): void {
    this.registerRoutes(routes);
  }

  private static registerRoutes(routes: RouteExtended[], parent?: any): void {
    routes.forEach((route: RouteExtended) => {
      this.registerRouteExtended(route, parent);
    });
  }

  private static registerRouteExtended(routeExtend: RouteExtended, parent?: any): void {
    this.registry[routeExtend.id] = {
      id: routeExtend.id,
      path: parent ? parent.path + '/' + routeExtend.path : routeExtend.path,
      parent: parent
    };
    if (routeExtend.children) {
      this.registerRoutes(routeExtend.children, this.registry[routeExtend.id]);
    }
  }

  static getPathFromId(id: string, params?: any): string {
    if (id) {
      let tokens: string[] = id.split(':');
      if (params) {
        let path = this.registry[id] ? this.registry[id].path : null;
        let regex = new RegExp(/\/:[^\/]*/g, 'g');
        let tokensPath = path.match(regex);
        let finalRoute = path;
        tokensPath.forEach((token: string) => {
          let field = token.replace('/:', '');
          finalRoute = finalRoute.replace(token, '/' + params[field]);
        });
        return finalRoute;
      } else if (tokens.length === 1) {
        return this.registry[id] ? this.registry[id].path : null;
      } else if (tokens.length > 1) {
        let routeId = tokens[0];
        let path = this.registry[routeId] ? this.registry[routeId].path : null;
        let finalRoute;
        if (path) {
          let regex = new RegExp(/\/:[^\/]*/g, 'g');
          let tokensPath = path.match(regex);
          let idx = 1;
          tokensPath.forEach((token: string) => {
            finalRoute = path.replace(token, '/' + tokens[idx]);
            idx++;
          });
        }
        return finalRoute;
      }
    }
    return null;

  }


}
