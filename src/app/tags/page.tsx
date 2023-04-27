"use client";
import {
  type ChangeEventHandler,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

const tags = [
  { id: 1, name: "tag1" },
  { id: 2, name: "tag2" },
  { id: 3, name: "tag3" },
  { id: 4, name: "tag4" },
];

type TagType = {
  id?: number;
  name: string;
};
interface TagProps {
  tag: TagType;
  onDelete?: (tag: TagType) => void;
}

const Tag = ({ tag, onDelete }: TagProps) => {
  return (
    <div className="rounded-full bg-slate-400 px-5 py-2 text-white">
      {onDelete && (
        <button
          className="mx-2 font-bold text-red-800"
          onClick={() => onDelete(tag)}
        >
          x
        </button>
      )}
      {tag.name}
    </div>
  );
};

export default function Page() {
  const [toAddList, setToAddList] = useState<TagType[]>([]);
  const [deletedTags, setDeletedTags] = useState<TagType[]>([]);
  
  // We use a ref to access the input value, and we dont use state because we don't need to validate anything
  const inputRef = useRef<HTMLInputElement>(null);

  // useCallback because we don't want to redefine this ever
  const onDelete = useCallback((tag: TagType) => {
    setDeletedTags((prev) => [...prev, tag]);
  }, []);

  const onAdd = useCallback(() => {
    const name = inputRef.current?.value;
    if (!!name && inputRef.current) {
      inputRef.current.value = "";
      setToAddList((prev) => [...prev, { name }]);
    }
  }, []);

  // useCallback with deletedTags and toAddList because we don't want to redeclare this unless those change
  const save = useCallback(() => {
    const operations = {
      toDelete: deletedTags,
      toAdd: toAddList,
    };
    console.log({ operations });
  }, [deletedTags, toAddList]);


  // useMemo because we only want to compute this list when deletedTags or toAddList changes
  const renderTags = useMemo(() => {
	return [...tags.filter((tag) => !deletedTags.find(t => t.id === tag.id)), ...toAddList]
  }, [deletedTags, toAddList])

  return (
    <div>
      <input placeholder="New tag name" ref={inputRef} />
      <button onClick={onAdd}>Add tag</button>

      <div className="mt-10 flex gap-2">
        {renderTags.map((tag, i) => (
          <Tag tag={tag} key={i} onDelete={onDelete} />
        ))}
      </div>

      <button onClick={save} className="mt-5">
        Save
      </button>
    </div>
  );
}
