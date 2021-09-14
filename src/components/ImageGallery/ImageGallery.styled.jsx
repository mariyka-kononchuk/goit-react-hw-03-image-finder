import styled from '@emotion/styled'


export const List = styled.ul`
    display: grid;
    width: 1320px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-auto-rows: 260px;
    grid-gap: 12px;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
  `

export const Item = styled.li`
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
  `

