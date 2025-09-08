import React from 'react';
import { borderColors, cn } from '../../../styles/colors';

export default function Table() {
  return {
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto my-6">
        <table 
          className={cn('min-w-full border', borderColors.default)} 
          {...props} 
        />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className={cn('border-b', borderColors.default)} {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th 
        className={cn(
          'border px-4 py-2 text-left',
          borderColors.default,
          'bg-gray-100 dark:bg-gray-800'
        )} 
        {...props} 
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td 
        className={cn('border px-4 py-2', borderColors.default)} 
        {...props} 
      />
    ),
  };
}
