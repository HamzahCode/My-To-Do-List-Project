"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

let questid = 1;

export default function MyList() {
  const [inputs, setinputs] = useState("");
  const [edit, setedit] = useState("");
  const [quests, setquest] = useState([]);
  const [filters, setfilters] = useState([]);
  const [active, setactive] = useState(false);

  const [id, setid] = useState();

  function handleClick() {
    setquest([
      ...quests,
      { id: questid++, name: inputs, status: "In Progress" },
    ]);
    setinputs("");
    let x = document.querySelectorAll("li");
    x[0].className = "inactive";
    x[1].className = "inactive";
    x[2].className = "active";
  }
  function handleDone(id) {
    let done = quests.map((quest) => {
      if (quest.id == id) {
        let don = { ...quest, status: "Done" };
        return don;
      }
      return quest;
    });
    setquest(done);
    let x = document.querySelectorAll("li");
    x[0].className = "inactive";
    x[1].className = "inactive";
    x[2].className = "active";
  }
  useEffect(() => {
    setfilters([...quests]);
  }, [quests]);

  function handleDelete(id) {
    let del = quests.filter((quest) => {
      if (quest.id !== id) {
        return quest;
      }
    });
    setquest(del);
    let x = document.querySelectorAll("li");
    x[0].className = "inactive";
    x[1].className = "inactive";
    x[2].className = "active";
  }
  function handletabs(e) {
    let x = document.querySelectorAll("li");
    let status = e.target.innerHTML;
    let d = x.forEach((e) => {
      if (e.innerHTML == status) {
        e.className = "active";
      } else {
        e.className = "inactive";
      }
    });

    if (status === "All") {
      setfilters(quests);
    } else {
      const filteredQuests = quests.filter((quest) => quest.status === status);
      setfilters(filteredQuests);
    }
  }
  function handleEditChange(e) {
    setedit(e.target.value);
  }
  function HandleEdit({ show, id }) {
    if (show == true) {
      return (
        <div className="edit">
          <label>New Name: </label>
          <input
            value={edit}
            autoFocus
            onChange={(e) => {
              handleEditChange(e);
            }}
            type="text"
          />
          <button
            onClick={() => {
              let editing = quests.map((quest) => {
                if (id == quest.id) {
                  let updated = { ...quest, name: edit };
                  return updated;
                } else {
                  return quest;
                }
              });
              setquest(editing);
              setedit("");
              setactive(false);
            }}
          >
            Done
          </button>
          <button
            onClick={(e) => {
              setactive(false);
              setedit("");
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  function List() {
    if (filters.length > 0) {
      return filters.map((quest) => (
        <>
          <div className="content" key={quest.id}>
            <div>
              <span>Quest Name: </span>
              {quest.name}
              <div>
                <span>Status : </span>
                {quest.status}
              </div>
            </div>
            <div className="manages">
              <button
                onClick={() => {
                  setactive(true);
                  setid(quest.id);
                }}
              >
                🖊
              </button>

              <button
                onClick={() => {
                  handleDelete(quest.id);
                }}
              >
                ❌
              </button>
              <button
                style={{ color: "green" }}
                onClick={() => {
                  handleDone(quest.id);
                }}
              >
                ✔
              </button>
            </div>
          </div>
        </>
      ));
    } else {
      return <h2>There is nothing to show here</h2>;
    }
  }
  return (
    <div className="container">
      <div className="add">
        <input
          onChange={(e) => {
            setinputs(e.target.value);
          }}
          value={inputs}
          type="text"
        />
        <span> </span>
        <button onClick={handleClick} style={{ width: "60px" }}>
          Add
        </button>
      </div>
      <div className="tabbar">
        <ul>
          <li
            onClick={(e) => {
              handletabs(e);
            }}
          >
            In Progress
          </li>
          <li
            onClick={(e) => {
              handletabs(e);
            }}
          >
            Done
          </li>
          <li
            className="active"
            onClick={(e) => {
              handletabs(e);
            }}
          >
            All
          </li>
        </ul>
      </div>
      <div className="list">
        <List />
      </div>
      <HandleEdit show={active} id={id} />
    </div>
  );
}
