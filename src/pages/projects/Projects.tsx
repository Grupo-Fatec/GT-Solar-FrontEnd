import Modal from "@/components/patterns/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IProject, IInsertProject } from "@/interfaces/IProjects";
import { IClient } from "@/interfaces/person/client/IClient";
import { IEngineer } from "@/interfaces/person/IEngineer";
import { IInstaller } from "@/interfaces/person/IInstaller";

import { ProjectService } from "@/services/ProjectService";
import { ClientService } from "@/services/ClientService";
import { PersonService } from "@/services/PersonService";
import { StatusEnum } from "@/enums/StatusEnum";
import { Pencil, Trash2 } from "lucide-react";
import { EquipmentService } from "@/services/EquipmentService";
import { IEquipments } from "@/interfaces/supplier/IEquipments";
import StatusBadge from "@/components/StatusBadge";

const Projects = () => {
  const navigate = useNavigate();
  const projectService = new ProjectService();
  const clientService = new ClientService();
  const personService = new PersonService();
  const equipmentService = new EquipmentService();

  const emptyProject: IInsertProject = {
    id: "",
    name: "",
    clientId: "",
    engineerId: "",
    installerId: "",
    energyConsumption: 0,
    equipments: [],
  };

  const [projects, setProjects] = useState<IProject[]>([]);
  const [project, setProject] = useState<IInsertProject>(emptyProject);
  const [clients, setClients] = useState<IClient[]>([]);
  const [engineers, setEngineers] = useState<IEngineer[]>([]);
  const [installers, setInstallers] = useState<IInstaller[]>([]);
  const [equipments, setEquipments] = useState<IEquipments[]>([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [idDelete, setIdDelete] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);




  const fetchData = async () => {
    const [projectData, clientsData, engineersData, installersData, equipmentsData] = await Promise.all([
      projectService.getAll(),
      clientService.getAll(),
      personService.findAllEngineers(),
      personService.findAllInstallers(),
      equipmentService.findAll(),
    ]);

    setProjects(projectData);
    setClients(clientsData);
    setEngineers(engineersData);
    setInstallers(installersData);
    setEquipments(equipmentsData);
  };

  const goTo = (route: string) => navigate(route);

  const onCreate = () => {
    setEditMode(false);
    setProject(emptyProject);
    setModalOpen(true);
  };

  const onDelete = (id: string) => {
    setIdDelete(id);
    setDeleteModal(true);
  };

  const handleCreate = async () => {
    const adminEmail: any = localStorage.getItem("user");
    if (!adminEmail) {
      alert("Admin não logado!");
      return;
    }
    await projectService.create(adminEmail, project);
    setProject(emptyProject);
    setModalOpen(false);
    fetchData();
  };

  const handleUpdate = async () => {
    await projectService.update(project.id, project);
    setModalOpen(false);
    setEditMode(false);
    setProject(emptyProject);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await projectService.deleteById(id);
    fetchData();
    setDeleteModal(false);
  };

  const openEditModal = (p: IProject) => {
    setProject({
      id: p.id,
      name: p.name,
      clientId: p.client.id,
      engineerId: p.engineer.id!,
      installerId: p.installer.id!,
      energyConsumption: p.energyConsumption,
      equipments: p.equipments.map((eq) => ({
        id: eq.id,
        name: eq.name,
        price: eq.price,
        type: eq.type,
        power: eq.power,
        guarantee: eq.guarantee,
        supplierId: eq.supplierId,
        quantity: (eq as any).quantity || 1, // assumindo quantity vem no projeto, ou default 1
      })),
    });
    setEditMode(true);
    setModalOpen(true);
  };

  // Atualiza ou adiciona equipamento com quantidade
  const updateEquipmentQuantity = (equipmentId: string, quantity: number) => {
    if (quantity < 1) {
      // Remove equipamento se quantidade < 1
      const updated = project.equipments.filter((eq) => eq.id !== equipmentId);
      setProject({ ...project, equipments: updated });
    } else {
      // Verifica se equipamento existe
      const exists = project.equipments.find((eq) => eq.id === equipmentId);
      if (exists) {
        // Atualiza quantidade
        const updated = project.equipments.map((eq) =>
          eq.id === equipmentId ? { ...eq, quantity } : eq
        );
        setProject({ ...project, equipments: updated });
      } else {
        // Adiciona equipamento com quantidade inicial
        const equipmentToAdd = equipments.find((eq) => eq.id === equipmentId);
        if (equipmentToAdd) {
          setProject({
            ...project,
            equipments: [...project.equipments, { ...equipmentToAdd, quantity }],
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Engenheiro</TableHead>
              <TableHead className="text-center">Cliente</TableHead>
              <TableHead className="text-center">Instalador</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow
                key={p.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <TableCell
                  className="text-center"
                  onClick={() => goTo(`/pages/projects/${p.id}`)}
                >
                  {p.id.length > 5
                    ? p.id.slice(p.id.length - 5) + "..."
                    : p.id}
                </TableCell>
                <TableCell className="text-center">{p.name}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={StatusEnum[p.status]} />
                </TableCell>
                <TableCell
                  className="text-center"
                  onClick={() => navigate(`/pages/projects/${p.id}`)}
                >
                  {p.engineer?.name}
                </TableCell>
                <TableCell className="text-center">{p.client?.name}</TableCell>
                <TableCell className="text-center">{p.installer?.name}</TableCell>
                <TableCell className="text-center space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <section>
        <div className="mt-8 flex justify-end">
          <Button
            className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
            onClick={onCreate}
          >
            Adicionar Projeto
          </Button>
        </div>
      </section>

      <Modal
        title={editMode ? "Editar Projeto" : "Cadastro de Projeto"}
        description={
          editMode ? "Atualize os dados do projeto" : "Preencha os campos para criar"
        }
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditMode(false);
          setProject(emptyProject);
        }}
        onConfirm={editMode ? handleUpdate : handleCreate}
        confirmLabel={editMode ? "Salvar Alterações" : "Salvar"}
        confirmColor="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
      >
        <form className="flex flex-col gap-4 w-full p-3">
          <div>
            <label>Nome do projeto</label>
            <Input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              placeholder="Nome do projeto"
            />
          </div>

          <div>
            <label>Consumo energético (kWh)</label>
            <Input
              type="number"
              value={project.energyConsumption}
              onChange={(e) =>
                setProject({ ...project, energyConsumption: Number(e.target.value) })
              }
              placeholder="kWh"
            />
          </div>

          <div>
            <label>Cliente</label>
            <select
              value={project.clientId}
              onChange={(e) => setProject({ ...project, clientId: e.target.value })}
              className="p-3 w-full border rounded"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Engenheiro</label>
            <select
              value={project.engineerId}
              onChange={(e) => setProject({ ...project, engineerId: e.target.value })}
              className="p-3 w-full border rounded"
            >
              <option value="">Selecione um engenheiro</option>
              {engineers.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Instalador</label>
            <select
              value={project.installerId}
              onChange={(e) => setProject({ ...project, installerId: e.target.value })}
              className="p-3 w-full border rounded"
            >
              <option value="">Selecione um instalador</option>
              {installers.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Equipamentos</label>
            <div className="overflow-y-auto rounded max-h-[250px] border p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center w-12">Qtd</TableHead>
                    <TableHead className="text-center">Nome</TableHead>
                    <TableHead className="text-center">Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipments.map((eq) => {
                    const projectEq = project.equipments.find((e) => e.id === eq.id);
                    return (
                      <TableRow key={eq.id}>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min={0}
                            value={projectEq?.quantity ?? 0}
                            onChange={(e) =>
                              updateEquipmentQuantity(eq.id, Number(e.target.value))
                            }
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell className="text-center">{eq.name}</TableCell>
                        <TableCell className="text-center">
                          {eq.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Deletar projeto"
        description={`Tem certeza que deseja deletar o projeto ${JSON.stringify(
          projects.find((e) => e.id == idDelete)?.name
        )}? Essa ação não poderá ser desfeita.`}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => handleDelete(idDelete)}
        confirmLabel="Deletar"
        confirmColor="bg-red-600 text-white hover:bg-red-700"
      />
    </main>
  );
};

export default Projects;
