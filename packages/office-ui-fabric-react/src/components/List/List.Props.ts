import * as React from 'react';
import { IRectangle, IRenderFunction } from '../../Utilities';
import { List } from './List';

export interface IList {
  /**
   * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
   * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
   *
   * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
   * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
   *
   * @param index Index of item to scroll to
   * @param measureItem Optional callback to measure the height of an individual item
   */
  scrollToIndex(index: number, measureItem?: (itemIndex: number) => number): void;
}

export interface IListProps extends React.HTMLAttributes<List | HTMLDivElement> {
  /**
   * Optional callback to access the IList interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IList) => void;

  /** Optional classname to append to root list. */
  className?: string;

  /** Items to render. */
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderCell?: (item?: any, index?: number) => React.ReactNode;

  /** Optional callback for monitoring when a page is added. */
  onPageAdded?: (page: IPage) => void;

  /** Optional callback for monitoring when a page is removed. */
  onPageRemoved?: (page: IPage) => void;

  /** Optional callback to get the item key, to be used on render. */
  getKey?: (item: any, index?: number) => string;

  /**
   * Called by the list to get information about a page.
   * Can be used if all information (item count, height) can be
   * determined at once.
   */
  getPage?: (itemIndex?: number, visibleRect?: IRectangle) => {
    /**
     * The number of items to allocate to the page.
     */
    itemCount?: number;
    /**
     * The estimated pixel height of the page.
     */
    height?: number;
    /**
     * Data to pass through to the page when rendering.
     */
    data?: any;
  };

  /** Method called by the list to get how many items to render per page from specified index. */
  getItemCountForPage?: (itemIndex?: number, visibleRect?: IRectangle) => number;

  /**
   * Method called by the list to get the pixel height for a given page. By default, we measure the first
   * page's height and default all other pages to that height when calculating the surface space. It is
   * ideal to be able to adequately predict page heights in order to keep the surface space from jumping
   * in pixels, which has been seen to cause browser performance issues.
   */
  getPageHeight?: (itemIndex?: number, visibleRect?: IRectangle) => number;

  /**
   * Method called by the list to derive the page style object. For spacer pages, the list will derive
   * the height and passed in heights will be ignored.
   */
  getPageStyle?: (page: IPage) => any;

  /**
   * In addition to the visible window, how many windowHeights should we render ahead.
   * @default 2
   */
  renderedWindowsAhead?: number;

  /**
   * In addition to the visible window, how many windowHeights should we render behind.
   * @default 2
   */
  renderedWindowsBehind?: number;

  /** Index in items array to start rendering from. Defaults to 0. */
  startIndex?: number;

  /** Number of items to render. Defaults to items.length. */
  renderCount?: number;

  /**
   * Called to add styles to a given cell during rendering.
   */
  getCellStyle?: (item: any, index: number) => any;

  /**
   * Called to add a class to a given page during rendering.
   */
  getPageClassName?: (page: IPage) => string;

  /**
   * Called to add a class to a given list cell during rendering.
   */
  getCellClassName?: (item: any, index: number) => string;

  /**
   * Additional class for the list surface element.
   */
  surfaceClassName?: string;

  /**
   * Called when the List will render a page.
   * Override this to control how cells are rendered within a page.
   */
  onRenderPage?: (pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) => React.ReactNode;
}

export interface IPage {
  key: string;
  items: any[];
  startIndex: number;
  itemCount: number;
  style: any;
  top: number;
  height: number;
  data?: any;
}

export interface IPageProps extends React.HTMLProps<HTMLDivElement> {
  page: IPage;
}
