import React from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';

const Layout = ({ className, children, theme }) => (
  <div data-react-toolbox='layout' className={classnames(theme.layout, className)}>
    {children}
  </div>
);

const ALLOWED_THEMED = [
  'Themed Panel',
  'Themed NavDrawer|Themed Panel',
  'Themed NavDrawer|Themed Panel|Themed Sidebar',
  'Themed Panel|Themed Sidebar'
];

function getChildName (child) {
  if (child.type) {
    return child.type.displayName || child.type.name || child.type;
  }
  if (!child.constructor || !child.constructor.name) {
    return 'UNKNOWN';
  }
  return child.constructor.name;
}

Layout.propTypes = {
  children (props, propName, componentName) {
    // Accept only [NavDrawer]Pane[Sidebar]
    const children = props[propName];
    if (React.Children.count(children) > 3) {
      return new Error(
        '`' + componentName + '` '
        + 'should have a Pane for a child, optionally preceded and/or followed by a Drawer.'
      );
    }

    const names = React.Children.map(children, getChildName).join('|');
    if (!(~ALLOWED_THEMED.indexOf(names))) {
      return new Error(
        '`' + componentName + '` '
        + 'should have a Panel for a child, optionally preceded by a NavDrawer and/or followed by a Sidebar.'
      );
    }
  },
  className: React.PropTypes.string,
  theme: React.PropTypes.shape({
    layout: React.PropTypes.string.isRequired
  })
};

Layout.defaultProps = {
  className: ''
};

export default themr('ToolboxLayout')(Layout);
