import useVisualMode from '../../hooks/useVisualMode';

export default function edit(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";

      //function that transitions what is being displayed
      const { mode, transition, back } = useVisualMode(
        SHOW 
      );


  return (
    <div>
      {}
      <div>{props.name}</div>
      <div>{props.description}</div>
      <div>{props.amount}</div>
    </div>
  );

}