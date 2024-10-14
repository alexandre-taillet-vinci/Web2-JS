export interface PageTitleProps {
    title: string;
  }
  
export const PageTitle = (props: PageTitleProps) => {
    return (
      <header>
        <h1 className="animate__animated animate__bounce">{props.title}</h1>
      </header>
    );
  };