export type Axis = {id:string;label:string;description:string};
export type Question = {id:string;axis:string;prompt:string;options:Array<{id:string;text:string;value:number}>};
export type Position = {score:number|null;status:string;summary:string|null;sources:string[]};
export type Candidate = {id:string;name:string;party:string;partyFull:string;tier:number;dataCompleteness:string;age:number|null;runningMate:{name:string;age:number|null};corePosition:string|null;positions:Record<string,Position>};
