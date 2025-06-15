import { IEngineer } from "@/interfaces/person/IEngineer";
import { PersonService } from "@/services/PersonService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Engineer = () => {
  const service = new PersonService();
  const { id } = useParams();
  const [engineer, setEngineer] = useState<IEngineer>();
  useEffect(() => {
    const fetchEngineer = async () => {
      const data = await service.findEngineerById(id);
      setEngineer(data);
    };
    fetchEngineer();
  }, []);
  return (
    <main>
      <h1>Página para a listagem de apenas um engineer</h1>
      {JSON.stringify(engineer)}
    </main>
  );
};

export default Engineer;
