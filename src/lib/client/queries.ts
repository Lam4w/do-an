import { toast } from "@/hooks/use-toast";
import { Settings, Snapshot, UserCV } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import clearCachesByServerAction from "../revalidate";
import { CvCreateRequest, CvDeleteRequest, CvEditRequest } from "../validators/cv";
import { SnapshotCreateRequest, SnapshotUpdateRequest } from "../validators/snapshot";

export const useGetCvs = () => {
  return useQuery({
    queryKey: ['userCvs'],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/cv");

      // revalidatePath('/dashboard')
      return data as UserCV[];
    },
  });
}

export const useGetArchives = () => {
  return useQuery({
    queryKey: ["userArchives"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user/cv/archive");

      return data as UserCV;
    },
    refetchOnMount: true,
  });
}

export const useCreateCv = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (title: string) => {
      const payload: CvCreateRequest = {
        title: title,
      };
      const { data } = await axios.post("/api/user/cv", payload);

      clearCachesByServerAction("/dashboard")

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }
    },
    onSuccess: (data) => {
      // return queryClient.refetchQueries({ queryKey: ['userCvs'] })
      return router.push(`/cv/edit?cv=${data}`);
    },
  });
}

export const useGetSnapshot = () => {
  const searchParams = useSearchParams()
  const cvId = searchParams.get('cv')
  const snapshotId = searchParams.get('snapshot')

  return useQuery({
    queryKey: ['getSnapshot', `${cvId}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cv/snapshot?cv=${cvId}` +
      (!!snapshotId ? `&snapshot=${snapshotId}` : ""));

      return data as Snapshot;
    },
    gcTime: 0,
    staleTime: 0,
  });
}

type SnapshotCreate = { 
  cvId: string, 
  title: string, 
  contentMain: string, 
  contentSide: string, 
  settings: Settings 
}

export const useCreateSnapshot = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ cvId, contentMain, contentSide, settings, title} : SnapshotCreate) => {
      const payload: SnapshotCreateRequest = {
        cvId,
        title,
        contentMain,
        contentSide,
        settings,
      };

      const { data } = await axios.post("/api/cv/snapshot", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      return toast({
        title: "There was an error",
        description: "Could not create snapshot, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      return toast({
        title: "Success",
        description: "Successfully created snapshot",
        variant: "default",
      });
    }
  });
}

type SnapshotContent = {
  cvId: string, 
  snapshotId: string, 
  title:string, 
  contentMain: string, 
  contentSide: string, 
  settings: Settings
}

export const useUpdateSnapshotContent = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ cvId, snapshotId, title, contentMain, contentSide, settings } : SnapshotContent) => {
      const payload: SnapshotUpdateRequest = {
        cvId,
        snapshotId,
        title,
        contentMain,
        contentSide,
        settings,
      };

      const { data } = await axios.patch("/api/cv", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not update your snapshot, please try again later.",
        variant: "destructive",
      });
    },
  });
}

type SnapshotSettings = {
  cvId: string, 
  snapshotId: string, 
  settings: Settings
}

export const useUpdateSnapshotSettings = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({cvId, snapshotId, settings } : SnapshotSettings) => {
      const payload: SnapshotUpdateRequest = {
        cvId,
        snapshotId,
        settings,
      };
      const { data } = await axios.patch("/api/cv", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not update your snapshot, please try again later.",
        variant: "destructive",
      });
    },
  });
}

export const useGetSnapshots = (cvId: string) => {
  return useQuery({
    queryKey: ["userSnapshots"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/cv/snapshot?cv=${cvId}`);

      return data;
    },
  });
}

export const useEditCv = () => {
  const queryClient = useQueryClient()
  const router= useRouter()

  return useMutation({
    mutationFn: async ({ title, id }: { title: string; id: string }) => {
      const payload: CvEditRequest = {
        title,
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not create new CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userCvs'], })
    },
  });
}

export const useArchiveCv = () => {
  const queryClient = useQueryClient()
  const router= useRouter()

  return useMutation({
    mutationFn: async (id: string) => {
      const payload: CvDeleteRequest = {
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv/archive", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      return toast({
        title: "There was an error",
        description: "Could not archive CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      // return queryClient.invalidateQueries({ queryKey: ["userCvs"] })

      return queryClient.setQueryData(['userCvs'], data)
    },
  });
}

export const useDeleteCv = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (id: string) => {
      const payload: CvDeleteRequest = {
        cvId: id,
      };
      const { data } = await axios.patch("/api/user/cv/delete", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different CV name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      return toast({
        title: "There was an error",
        description: "Could not delete CV, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: ['userTrash'] }) 
    },
  });
}

export const useCreateStripeSession = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/stripe");

      return data as { url: string };
    },
    onError: (err) => {
      console.log(err)
      toast({
        title: "There was an error",
        description: "please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data : { url: string }) => {
      const { url } = data;

      window.location.href = url ?? "/billing"
    }
  });
}

export const useCreatePDF = () => {
  return useMutation({
    mutationFn: async (pdfLink: string) => {
      const { data } = await axios.post(pdfLink, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf'
        }
      })

      return data;
    },
    onError: (err) => {
      console.log(err)
      toast({
        title: "There was an error",
        description: "please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (response) => {
      const blob = new Blob([response.data], {type: 'application/pdf'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `generated_cv.pdf`
      link.click()
    }
  });
}