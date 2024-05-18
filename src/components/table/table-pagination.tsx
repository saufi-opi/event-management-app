import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'

interface Props {
  page: number
  totalPages: number
  offset?: number
}

const disabledStyle = 'pointer-events-none text-gray-400'

function TablePagination(props: Props) {
  const pageNumbers: number[] = []
  const offset = props.offset ?? 2
  for (let i = props.page - offset; i <= props.page + offset; i++) {
    if (i >= 1 && i <= props.totalPages) {
      pageNumbers.push(i)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={props.page <= 1 ? disabledStyle : undefined} href={`?page=${props.page - 1}`} />
        </PaginationItem>
        {props.page - offset > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`?page=${page}`} isActive={props.page === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {props.page + offset < props.totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext className={props.page >= props.totalPages ? disabledStyle : undefined} href={`?page=${props.page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination
