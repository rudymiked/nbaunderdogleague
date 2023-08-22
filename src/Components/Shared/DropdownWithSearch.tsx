import React from 'react';
import { Button, Form } from 'react-bootstrap';

type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  };
  
export const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(
    ({ children, onClick }, ref) => (
      <Button
        href=""
        ref={ref}
        onClick={(e: any) => {
          e.preventDefault();
          onClick(e);
        }}
        variant='dark'
      >
        {children}
        &#x25bc;
      </Button>
    )
  );

  type CustomMenuProps = {
    children: React.ReactNode;
    style: React.CSSProperties;
    className: string;
    'aria-labelledby': string;
  };
  
export const CustomMenu = React.forwardRef<HTMLDivElement, CustomMenuProps>(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = React.useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child: any) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );